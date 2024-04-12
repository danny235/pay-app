// get user token

export async function GET(req: Request) {
    const token = req.headers.get("Auth-Token") as string;
  
  
    try {
      if (!token) {
        return Response.json({ message: "No token provided" }, { status: 400 });
      }
  
      const userData = await fetch(
        "https://api.100pay.co/api/v1/pay/invoice",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Api-Key": process.env.API_KEY ? process.env.API_KEY : "",
            "Auth-Token": token,
          },
        }
      );
      const responseData = await userData.json();
      if (userData.ok) {
        return Response.json(responseData, { status: 200 });
      } else {
        return Response.json(
          { message: "Error getting user token" },
          { status: 400 }
        );
      }
    } catch (error) {
      console.error("Error getting user token", error);
      return Response.json(
        { message: "Error getting user token" },
        { status: 400 }
      );
    }
  }
  