import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  getIncomingRequests,
  getMyRequests,
  acceptRequest,
  rejectRequest,
} from "../services/exchangeService";

function RequestsPage() {
  const [incoming, setIncoming] = useState([]);

  const [sent, setSent] = useState([]);

  const fetchRequests = async () => {
    try {
      const incomingData = await getIncomingRequests();

      const sentData = await getMyRequests();

      setIncoming(incomingData);

      setSent(sentData);
    } catch (error) {
      toast.error(
    error.response?.data?.message ||
    "Failed to load requests"
);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAccept = async (id) => {
    try {
      await acceptRequest(id);

      fetchRequests();
    } catch (error) {
      toast.error(
    error.response?.data?.message ||
    "Accept failed"
);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectRequest(id);

      fetchRequests();
    } catch (error) {
      toast.error(
    error.response?.data?.message ||
    "Reject failed"
);
    }
  };

  return (
    <div className="p-6 space-y-10">
      {/* Incoming Requests */}

      <section>
        <h1 className="text-3xl font-bold mb-4">Incoming Requests</h1>

        {incoming.length === 0 ? (
          <p>No incoming requests yet.</p>
        ) : (
          <div className="space-y-4">
            {incoming.map((req) => (
              <div
                key={req.id}
                className="
                                    shadow
                                    p-4
                                    rounded-xl
                                    flex
                                    justify-between
                                    items-center
                                "
              >
                <div>
                  <h2 className="font-bold">{req.bookTitle}</h2>

                  <p>Requested by: {req.requesterName}</p>

                  <span
                    className={`
        inline-block
        px-3
        py-1
        rounded-full
        text-sm
        text-white
        ${
          req.status === "PENDING"
            ? "bg-yellow-500"
            : req.status === "ACCEPTED"
              ? "bg-green-600"
              : "bg-red-600"
        }
    `}
                  >
                    {req.status}
                  </span>
                </div>

                {req.status === "PENDING" && (
                  <div className="space-x-2">
                    <button
                      onClick={() => handleAccept(req.id)}
                      className="
                                                bg-green-600
                                                text-white
                                                px-4
                                                py-2
                                                rounded
                                            "
                    >
                      Accept
                    </button>

                    <button
                      onClick={() => handleReject(req.id)}
                      className="
                                                bg-red-600
                                                text-white
                                                px-4
                                                py-2
                                                rounded
                                            "
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Sent Requests */}

      <section>
        <h1 className="text-3xl font-bold mb-4">My Sent Requests</h1>

        {sent.length === 0 ? (
          <p>You have not sent any requests yet.</p>
        ) : (
          <div className="space-y-4">
            {sent.map((req) => (
              <div
                key={req.id}
                className="
                                    shadow
                                    p-4
                                    rounded-xl
                                "
              >
                <h2 className="font-bold">{req.bookTitle}</h2>

                <p>Owner: {req.ownerName}</p>

                <span
    className={`
        inline-block
        px-3
        py-1
        rounded-full
        text-sm
        text-white
        ${
            req.status === "PENDING"
                ? "bg-yellow-500"
                : req.status === "ACCEPTED"
                ? "bg-green-600"
                : "bg-red-600"
        }
    `}
>
    {req.status}
</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default RequestsPage;
