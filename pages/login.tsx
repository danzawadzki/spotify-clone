import { FunctionComponent } from "react";
import { getProviders } from "next-auth/react";
import { ClientSafeProvider, LiteralUnion } from "next-auth/react/types";
import { BuiltInProviderType } from "next-auth/providers";

type LoginProps = {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
};

const Login: FunctionComponent<LoginProps> = ({ providers }) => (
  <div>{"Im just regular login page"}</div>
);

export default Login;

export const getServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};
