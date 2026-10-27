import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router";
import { fetchApi } from "../lib/api";

export default function Success() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    if (!orderId) {
      setStatus("error");
      return;
    }

    let attempts = 0;
    const maxAttempts = 5;

    const checkStatus = async () => {
      try {
        const data = await fetchApi(`/api/checkout/status/${orderId}`);

        if (data.status === "paid") {
          setStatus("success");
          // Trigger the event so the Hero and the Header reload
          window.dispatchEvent(new Event("planUpdated"));
        } else if (attempts < maxAttempts) {
          attempts++;
          setTimeout(checkStatus, 2000); // Retry in 2 seconds
        } else {
          setStatus("pending");
        }
      } catch (err) {
        setStatus("error");
      }
    };

    checkStatus();
  }, [orderId]);

  return (
    <div className="min-h-screen bg-bg-alt flex items-center justify-center px-4">
      <div className="bg-bg p-8 rounded-xl shadow-md border border-border text-center max-w-md w-full">
        {status === "checking" && (
          <>
            <div className="w-10 h-10 border-4 border-border border-t-accent rounded-full animate-spin mx-auto mb-4"></div>
            <h1 className="text-2xl font-display mb-2">
              Confirming your payment...
            </h1>
            <p className="text-text-muted text-sm">Please wait a moment.</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="text-5xl mb-4 text-accent-2">✓</div>
            <h1 className="text-2xl font-display mb-2">Payment Successful!</h1>
            <p className="text-text-muted text-sm mb-6">
              Your membership is now active. Welcome to PULSO.
            </p>
            <Link
              to="/"
              className="inline-flex items-center justify-center bg-accent text-text text-sm font-semibold px-6 py-2 rounded-lg transition-colors hover:bg-accent-2 hover:text-white"
            >
              Back to Home
            </Link>
          </>
        )}

        {(status === "pending" || status === "error") && (
          <>
            <h1 className="text-2xl font-display mb-2">Payment Processing</h1>
            <p className="text-text-muted text-sm mb-6">
              We are still confirming your payment. Check your email later.
            </p>
            <Link
              to="/"
              className="inline-flex items-center justify-center bg-accent text-text text-sm font-semibold px-6 py-2 rounded-lg transition-colors hover:bg-accent-2 hover:text-white"
            >
              Back to Home
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
