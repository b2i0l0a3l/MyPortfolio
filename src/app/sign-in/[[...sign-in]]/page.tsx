import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/20 via-background to-background" />
      
      <div className="z-10 relative">
        <SignIn appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-card/80 backdrop-blur-xl border border-border shadow-2xl rounded-2xl",
            headerTitle: "text-foreground font-heading",
            headerSubtitle: "text-muted-foreground",
            socialButtonsBlockButton: "border-border hover:bg-muted text-foreground",
            socialButtonsBlockButtonText: "text-foreground font-medium",
            dividerLine: "bg-border",
            dividerText: "text-muted-foreground",
            formFieldLabel: "text-foreground",
            formFieldInput: "bg-background border-border text-foreground focus:ring-accent",
            formButtonPrimary: "bg-accent hover:bg-accent-hover text-accent-foreground shadow-lg shadow-accent/20",
            footerActionText: "text-muted-foreground",
            footerActionLink: "text-accent hover:text-accent-hover"
          }
        }} />
      </div>
    </div>
  );
}
