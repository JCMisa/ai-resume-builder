import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div>
      <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt=""
              src="/resume-builder-auth-bg.webp"
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />

            <div className="hidden lg:relative lg:block lg:p-12">
              <a className="block text-white" href="#">
                <span className="sr-only">Home</span>
                <svg
                  id="logo-35"
                  width="50"
                  height="39"
                  viewBox="0 0 50 39"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {" "}
                  <path
                    d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
                    className="ccompli1"
                    fill="#007AFF"
                  ></path>{" "}
                  <path
                    d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
                    className="ccustom"
                    fill="#312ECB"
                  ></path>{" "}
                </svg>
              </a>

              <h2 className="mt-6 text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
                Welcome to ReUp
              </h2>

              <p className="mt-4 leading-relaxed text-gray-950 font-semibold">
                AI that writes with you, not for you. Build a resume that shines
                as bright as your skills.
              </p>
            </div>
          </section>

          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl ">
              <div className="relative -mt-16 block lg:hidden">
                <a
                  className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
                  href="#"
                >
                  <span className="sr-only">Home</span>
                  <svg
                    id="logo-35"
                    width="50"
                    height="39"
                    viewBox="0 0 50 39"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {" "}
                    <path
                      d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
                      className="ccompli1"
                      fill="#007AFF"
                    ></path>{" "}
                    <path
                      d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
                      className="ccustom"
                      fill="#312ECB"
                    ></path>{" "}
                  </svg>
                </a>

                <h1 className="mt-2 text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
                  Welcome to ReUp
                </h1>

                <p className="mt-4 leading-relaxed text-gray-950">
                  AI that writes with you, not for you. Build a resume that
                  shines as bright as your skills.
                </p>
              </div>

              <div className="mt-5">
                <SignIn />
              </div>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
};

export default SignInPage;
