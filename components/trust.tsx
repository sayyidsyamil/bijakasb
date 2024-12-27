import { Users, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Trust() {
  return (
    <section className="py-12 bg-secondary/20">
      <div className="container px-4 md:px-6">
        {/* Trust Section */}
        <div className="flex flex-col items-center text-center space-y-4">
          <Users className="h-12 w-12 text-primary" />
          <h2 className="text-2xl font-bold">Trusted by Thousands</h2>
          <p className="text-muted-foreground max-w-[600px]">
            Join thousands of investors who use our calculator to make smarter
            financial decisions with ASB and ASBF investments.
          </p>
        </div>

        {/* Footer Section */}
        <footer className="pt-8 text-center">
          <p className=" text-muted-foreground">
            Made with passion by <span className="font-semibold">Sayyid Syamil</span>
          </p>
          <div className="flex justify-center space-x-4 mt-6">
            <Link
              href="https://www.linkedin.com/in/sayyidsyamil/"
              target="_blank"
              className="flex items-center space-x-1 hover:underline"
            >
              <Linkedin className="text-muted-foreground h-5 w-5 hover:scale-110 transition-all" />
            </Link>
            <Link
              href="https://www.instagram.com/sayyidsyamil"
              target="_blank"
              className="flex items-center space-x-1 hover:underline"
            >
              <Instagram className="text-muted-foreground h-5 w-5 hover:scale-110 transition-all" />
            </Link>
          </div>
        </footer>
      </div>
    </section>
  );
}


