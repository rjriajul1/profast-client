import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import axios from "axios";
import Swal from "sweetalert2";

const BeARider = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const [submitting, setSubmitting] = useState(false);

  const [centers, setCenters] = useState([]);
  const [regions, setRegions] = useState([]);
  const [filteredDistricts, setFilteredDistricts] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const selectedRegion = watch("region");

  useEffect(() => {
    axios
      .get("/serviceCenter.json") // public folder file path
      .then((res) => {
        setCenters(res.data);
        const uniqueRegions = [...new Set(res.data.map((c) => c.region))];
        setRegions(uniqueRegions);
      })
      .catch(() => toast.error("Failed to load region data"));
  }, []);

  useEffect(() => {
    const matched = centers.find((c) => c.region === selectedRegion);
    if (matched) {
      const allDistricts = centers
        .filter((c) => c.region === selectedRegion)
        .flatMap((c) => c.covered_area);
      setFilteredDistricts([...new Set(allDistricts)]);
    } else {
      setFilteredDistricts([]);
    }
  }, [selectedRegion, centers]);

  const onSubmit = async (data) => {
    setSubmitting(true);
    const riderData = {
      ...data,
      name: user?.displayName,
      email: user?.email,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    console.table(riderData);

    try {
      const res = await axiosSecure.post("/riders", riderData);
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your application successful",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
      } else {
        toast.error("Submission failed");
      }
    } catch {
      toast.error("Server error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded mt-10">
      <h2 className="text-3xl font-bold text-center mb-6">
        Apply to Be a Rider
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name (readonly) */}
          <div>
            <label className="label">Name</label>
            <input
              type="text"
              defaultValue={user?.displayName}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          {/* Email (readonly) */}
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              defaultValue={user?.email}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          {/* Age */}
          <div>
            <label className="label">Age</label>
            <input
              type="number"
              {...register("age", { required: true, min: 18 })}
              className="input input-bordered w-full"
              placeholder="Age"
            />
            {errors.age && (
              <p className="text-red-500 text-sm">Minimum age is 18</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="label">Phone Number</label>
            <input
              type="tel"
              {...register("phone", { required: true })}
              className="input input-bordered w-full"
              placeholder="Phone Number"
            />
          </div>

          {/* NID */}
          <div>
            <label className="label">National ID Number</label>
            <input
              type="text"
              {...register("nid", { required: true })}
              className="input input-bordered w-full"
              placeholder="e.g., 1234567890123"
            />
          </div>

          {/* Bike Brand */}
          <div>
            <label className="label">Bike Brand</label>
            <input
              type="text"
              {...register("bikeBrand", { required: true })}
              className="input input-bordered w-full"
              placeholder="e.g., Yamaha"
            />
          </div>

          {/* Bike Reg Number */}
          <div>
            <label className="label">Bike Registration Number</label>
            <input
              type="text"
              {...register("bikeRegNumber", { required: true })}
              className="input input-bordered w-full"
              placeholder="e.g., DHA-12345"
            />
          </div>

          {/* Region dropdown */}
          <div>
            <label className="label">Region</label>
            <select
              {...register("region", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select Region</option>
              {regions.map((region, i) => (
                <option key={i} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>

          {/* District dropdown */}
          <div>
            <label className="label">District</label>
            <select
              {...register("district", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select District</option>
              {filteredDistricts.map((district, i) => (
                <option key={i} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>

          {/* Motivation */}
          <div className="md:col-span-2">
            <label className="label">Why do you want to be a rider?</label>
            <textarea
              {...register("motivation", { required: true })}
              className="textarea textarea-bordered w-full"
              rows={3}
              placeholder="Write your motivation here"
            />
          </div>
        </section>

        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary w-full md:w-1/3 text-black"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BeARider;
