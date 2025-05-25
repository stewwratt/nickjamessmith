interface Env {
    AIRTABLE_BASE: string;
    AIRTABLE_TABLE: string;
    AIRTABLE_TOKEN: string;
}

interface RequestBody {
    email?: unknown;
}

// CORS headers for development and production
const corsHeaders = {
    'Access-Control-Allow-Origin': '*', // Allow all origins for now - update this to your production domain when ready
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        // Handle CORS preflight requests
        if (request.method === 'OPTIONS') {
            return new Response(null, {
                headers: corsHeaders
            });
        }

        // Only handle POST requests to /subscribe
        if (request.method !== 'POST' || new URL(request.url).pathname !== '/subscribe') {
            return new Response('Not Found', { status: 404 });
        }

        try {
            // Parse request body
            const body = await request.json() as RequestBody;
            const email = body.email?.toString().trim();

            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRegex.test(email)) {
                return new Response(
                    JSON.stringify({ error: 'Invalid email address' }),
                    {
                        status: 400,
                        headers: {
                            'Content-Type': 'application/json',
                            ...corsHeaders
                        }
                    }
                );
            }

            // Log the values we're using (for debugging)
            console.log('Debug info:', {
                base: env.AIRTABLE_BASE,
                table: env.AIRTABLE_TABLE,
                hasToken: !!env.AIRTABLE_TOKEN
            });

            // Prepare Airtable payload
            const payload = {
                records: [
                    {
                        fields: {
                            Email: email,
                            "Signup Date": new Date().toISOString()
                        }
                    }
                ]
            };

            // Send to Airtable
            const airtableUrl = `https://api.airtable.com/v0/${env.AIRTABLE_BASE}/${encodeURIComponent(env.AIRTABLE_TABLE)}`;
            console.log('Airtable URL:', airtableUrl);

            const airtableResponse = await fetch(
                airtableUrl,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${env.AIRTABLE_TOKEN}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                }
            );

            if (!airtableResponse.ok) {
                const errorText = await airtableResponse.text();
                console.error('Airtable error details:', {
                    status: airtableResponse.status,
                    statusText: airtableResponse.statusText,
                    error: errorText
                });

                return new Response(
                    JSON.stringify({ error: 'Failed to save email. Please try again.' }),
                    {
                        status: 422,
                        headers: {
                            'Content-Type': 'application/json',
                            ...corsHeaders
                        }
                    }
                );
            }

            return new Response(
                JSON.stringify({ ok: true }),
                {
                    status: 201,
                    headers: {
                        'Content-Type': 'application/json',
                        ...corsHeaders
                    }
                }
            );

        } catch (error) {
            console.error('Worker error:', error);
            return new Response(
                JSON.stringify({ error: 'Internal server error' }),
                {
                    status: 500,
                    headers: {
                        'Content-Type': 'application/json',
                        ...corsHeaders
                    }
                }
            );
        }
    }
};

/* Unit Test Example (Jest style)
describe('Email Capture Worker', () => {
  it('should handle valid email submission', async () => {
    const request = new Request('http://localhost/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email: 'test@example.com' })
    });
    
    const response = await worker.fetch(request, {
      AIRTABLE_BASE: 'test-base',
      AIRTABLE_TABLE: 'Form Submissions',
      AIRTABLE_TOKEN: 'test-token'
    });

    expect(response.status).toBe(201);
    expect(await response.json()).toEqual({ ok: true });
  });

  it('should reject invalid email', async () => {
    const request = new Request('http://localhost/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email: 'invalid-email' })
    });
    
    const response = await worker.fetch(request, {
      AIRTABLE_BASE: 'test-base',
      AIRTABLE_TABLE: 'Form Submissions',
      AIRTABLE_TOKEN: 'test-token'
    });

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ 
      error: 'Invalid email address' 
    });
  });
});
*/ 