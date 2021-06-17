require('dotenv').config();

class Auth0ManagementApi {
  constructor(private readonly baseUrl?: string) {}

  deleteUser = async (userId: string) => {
    await fetch(`https://${this.baseUrl}/api/v2/users/${userId}`, {
      headers: {
        authorization: `Bearer ${process.env.REACT_APP_AUTH0_MANAGEMENT_API_Token}`,
      },
      method: 'DELETE',
    });
  };
}
const instance = new Auth0ManagementApi(process.env.REACT_APP_AUTH0_DOMAIN);
export default instance;
