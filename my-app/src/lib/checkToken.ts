import type { ApolloClient } from "@apollo/client";
import { gql } from "@apollo/client";

export const CHECK_TOKEN_QUERY = gql`
  query CheckToken {
    checkToken {
      success
      user {
        id
        email
      }
    }
  }
`

export type CheckTokenQueryData = {
    checkToken: {
        success: boolean;
        user: null | { id: string; firstName: string; email: string };
    };
};

export async function validateToken(
    client: ApolloClient
): Promise<boolean> {
    const token = JSON.parse(localStorage.getItem("payload") || "null")?.token;
    if (!token) return false;

    try {
        const { data }: any = await client.query<CheckTokenQueryData>({
            query: CHECK_TOKEN_QUERY,
            fetchPolicy: "network-only",
            context: {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        });

        if (data.checkToken.success) return true;

        localStorage.removeItem("payload");
        return false;
    } catch {
        localStorage.removeItem("payload");
        return false;
    }
}
