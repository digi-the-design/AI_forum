export async function POST(request) {
  const formData = await request.formData();
  return Response.json({ ok: true, received: formData.get('file') ? 'file' : 'empty' });
}
