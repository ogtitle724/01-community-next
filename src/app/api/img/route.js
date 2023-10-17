export async function POST(request) {
  const res = await request.json();
  console.log("res------------------------------------------");
  console.log("ddddddd:", res);
  return Response.json({ data: res });
}
