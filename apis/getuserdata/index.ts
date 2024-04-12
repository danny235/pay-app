
// get user data

export async function GET(req: Request) {
  const data = req.headers.get("Auth-Token") as string;


  try {
    if (!data) {
      return Response.json({ message: "No token provided" }, { status: 400 });
    }
    if (data) {
      const userData = await fetch("https://api.100pay.co/api/v1/user/apps", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Api-Key": process.env.API_KEY
            ? process.env.API_KEY
            : "",
          "Auth-Token": data,
        },
      });
      const responseData = await userData.json();
      if (userData.ok) {
        return Response.json(responseData, { status: 200 });
      } else {
        return Response.json(
          { message: "Error getting user data" },
          { status: 400 }
        );
      }
    }
  } catch (error) {
    console.error("Error getting user data", error);
    return Response.json(
      { message: "Error getting user data" },
      { status: 400 }
    );
  }
}
