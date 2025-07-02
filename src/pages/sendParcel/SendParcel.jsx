// ✅ React & package imports
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

const SendParcel = () => {
  const { user } = useAuth();
  // ✅ React Hook Form সেটআপ
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [centers, setCenters] = useState([]);
  const [submitting,setSubmitting] = useState(false)
  const [regions, setRegions] = useState([]);
  const [filteredCenters, setFilteredCenters] = useState({
    sender: [],
    receiver: [],
  });
  const axiosSecure = useAxios()

  const type = watch("type");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  function generateTrackingId() {
  const randomNumber = Math.floor(1000000 + Math.random() * 9000000); // 7-digit number
  return randomNumber;
}




  useEffect(() => {
    axios
      .get("./serviceCenter.json")
      .then((res) => {
        setCenters(res.data);
        const uniqueRegions = [...new Set(res.data.map((c) => c.region))];
        setRegions(uniqueRegions);
      })
      .catch((error) => toast.error("Failed to load data", error));
  }, []);

  useEffect(() => {
    setFilteredCenters((prev) => ({
      ...prev,
      sender: centers.filter((c) => c.region === senderRegion),
    }));
  }, [senderRegion, centers]);

  useEffect(() => {
    setFilteredCenters((prev) => ({
      ...prev,
      receiver: centers.filter((c) => c.region === receiverRegion),
    }));
  }, [receiverRegion, centers]);

  const calcCost = ({ type, weight, senderRegion, receiverRegion }) => {
    const sameRegion = senderRegion === receiverRegion;

    if (type === "document") {
      return sameRegion ? 60 : 80;
    }

    if (type === "non-document") {
      if (weight <= 3) {
        return sameRegion ? 110 : 150;
      } else {
        const extraWeight = weight - 3;
        const base = sameRegion ? 110 : 150;
        const extra = extraWeight * 40;
        return sameRegion ? base + extra : base + extra + 40;
      }
    }

    return 0;
  };

  const onSubmit = async (data) => {
    setSubmitting(true)
    const cost = calcCost(data);
    const parcelData = {
      ...data,
      cost: cost,
      created_by: user?.email,
      payment_status: "unpaid",
      delivery_status: "not_collected",
      creation_date: new Date().toISOString(),
      senderName: user?.displayName,
      trackingId: generateTrackingId()
    };
    console.table(parcelData);
    toast((t) => (
      <div>
        <p className="font-semibold">Cost: ৳{cost}</p>
        <button
          className="btn btn-sm btn-primary mt-2  text-black"
          onClick={async () => {
            toast.dismiss(t.id);
            try {
             const {data} = await axiosSecure.post('/add-parcel',parcelData);
              if(data.insertedId){
                toast.success("Submitted!");
              }
            } catch {
              toast.error("Error saving");
            }finally{
              setSubmitting(false)
            }
          }}
        >
          Confirm
        </button>
      </div>
    ));
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Send a Parcel</h1>
        <p className="text-gray-500">Door-to-door delivery made simple</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <section className="border p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Parcel Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* radio button */}
            <div className="space-y-1">
              <label className="font-medium">Type</label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="document"
                    {...register("type", { required: true })}
                    className="radio"
                  />
                  <span>Document</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="non-document"
                    {...register("type", { required: true })}
                    className="radio"
                  />
                  <span>Non-document</span>
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="">parcel Name</label>
              <input
                {...register("parcelName", { required: true })}
                placeholder="Parcel Name"
                className="input input-bordered"
              />
            </div>

            <div>
              <label htmlFor="">parcel Weight</label>
              <input
                {...register("weight")}
                placeholder="Weight (kg)"
                type="number"
                className="input input-bordered"
                disabled={type !== "non-document"}
              />
            </div>
          </div>
        </section>

        {/* ✅ Sender এবং Receiver Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {["sender", "receiver"].map((role) => (
            <section key={role} className="border p-4 rounded shadow space-y-2">
              <h2 className="text-lg font-semibold">
                {role === "sender" ? "Sender Info" : "Receiver Info"}
              </h2>

              {role === "receiver" && (
                <input
                  placeholder="name"
                  {...register("receiverName")}
                  className="input input-bordered bg-gray-100"
                />
              )}

              <input
                type="number"
                {...register(`${role}Contact`, { required: true })}
                placeholder="Contact"
                className="input input-bordered"
              />

              <select
                {...register(`${role}Region`, { required: true })}
                className="select select-bordered"
              >
                <option value="">Select Region</option>
                {regions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>

              <select
                {...register(`${role}ServiceCenter`, { required: true })}
                className="select select-bordered"
              >
                <option value="">Select Area</option>
                {(role === "sender"
                  ? filteredCenters.sender
                  : filteredCenters.receiver
                ).flatMap((c, i) =>
                  c.covered_area.map((area, j) => (
                    <option key={`${i}-${j}`} value={area}>
                      {area} ({c.city})
                    </option>
                  ))
                )}
              </select>

              <input
                {...register(`${role}Address`, { required: true })}
                placeholder="Address"
                className="input input-bordered"
              />

              <textarea
                {...register(
                  role === "sender"
                    ? "pickupInstruction"
                    : "deliveryInstruction",
                  { required: true }
                )}
                placeholder="Instruction"
                className="textarea textarea-bordered"
              />
            </section>
          ))}
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary w-full md:w-1/3 text-black"
          >
            {submitting ? 'submitting.....' : 'submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendParcel;
