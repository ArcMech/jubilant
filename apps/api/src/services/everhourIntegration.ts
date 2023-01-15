export const getMe = async <T>(apiKey: string) => {
  const response: T = await fetch("https://api.everhour.com/users/me", {
    method: "GET",
    headers: { "X-Api-Key": apiKey },
  }).then((res) => res.json());
  // @todo handle errors too
  // @todo add basic type for EverHour Responses
  return response;
};
