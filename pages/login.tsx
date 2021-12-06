import { FunctionComponent } from "react";
import { getProviders, signIn } from "next-auth/react";
import { ClientSafeProvider, LiteralUnion } from "next-auth/react/types";
import { BuiltInProviderType } from "next-auth/providers";

type LoginProps = {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
};

const Login: FunctionComponent<LoginProps> = ({ providers }) => (
  <div className="flex flex-col align-center justify-center items-center bg-black min-h-screen w-full">
    <img
      src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png"
      className="w-72 mb-5"
      alt="Spotify logo"
    />
    {Object.values(providers).map((provider) => (
      <div key={provider.name}>
        <button
          className="bg-green-500 hover:bg-green-700 transition duration-100 ease-in-out text-white rounded-full py-2 px-6"
          onClick={() => signIn(provider.id, { callbackUrl: "/" })}
        >
          Login with {provider.name}
        </button>
      </div>
    ))}
  </div>
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
