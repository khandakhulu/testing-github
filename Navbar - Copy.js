import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";

const Navbar = () => {
  const { status, data: session } = useSession();
  // const { status, data: session } = getServerSession();

  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost text-xl">
          Next-Events
        </Link>
      </div>

      <div className="navbar-center">Search Bar here</div>

      <div className="navbar-end">
        {status === "authenticated" && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <Image
                  alt="Profile Picture"
                  src={session.user.image ?? "/default-user.png"}
                  width={60}
                  height={60}
                />
              </div>
            </div>
          </div>
        )}
        {status === "unauthenticated" && <div>Login see?</div>}
        <div>Login</div>
      </div>
    </div>
  );
};

export default Navbar;
