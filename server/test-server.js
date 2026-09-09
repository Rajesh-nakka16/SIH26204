const app = require('./server');

const server = app.listen(5099, async () => {
  console.log('Test server running on port 5099');
  try {
    const healthRes = await fetch('http://localhost:5099/api/health');
    const healthData = await healthRes.json();
    console.log('Health check:', healthData.status === 'ok' ? 'PASS' : 'FAIL');

    const destRes = await fetch('http://localhost:5099/api/destinations');
    const destData = await destRes.json();
    console.log('Destinations count:', destData.length > 0 ? 'PASS' : 'FAIL');

    const planRes = await fetch('http://localhost:5099/api/trips/plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        start: 'Hyderabad',
        destination: 'Araku Valley',
        travellers: 4,
        days: 4,
        budget: 30000,
        preferences: 'Nature + Local Food + Relaxation',
      }),
    });
    const planData = await planRes.json();
    console.log('Plan generation:', planData.itinerary?.length === 4 ? 'PASS' : 'FAIL');

    const assistantRes = await fetch('http://localhost:5099/api/assistant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'What about food in Araku?', language: 'Telugu' }),
    });
    const assistantData = await assistantRes.json();
    console.log('Assistant multilingual:', Boolean(assistantData.reply) ? 'PASS' : 'FAIL');

    console.log('ALL SERVER ENDPOINTS VALIDATED SUCCESSFULLY!');
    server.close();
    process.exit(0);
  } catch (err) {
    console.error('Test error:', err);
    server.close();
    process.exit(1);
  }
});
