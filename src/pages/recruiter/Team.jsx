import React, { useState, useEffect } from "react";
import { getTeam } from "../../services/api/api";
import { FadeLoader } from "react-spinners";

const Team = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch team data when the component mounts
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await getTeam();
        setTeam(response.data);
      } catch (error) {
        console.error("Error fetching team data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  if (loading) {
      return (
          <div className="flex flex-col items-center justify-center min-h-screen">
              <FadeLoader />
              <p>Setting up work area...</p>
          </div>
      )
  }

  return (
    <div className="mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Team</h2>
      </div>
      <div className="p-6">
        {loading ? (
          <div className="text-center py-4">
            <p className="text-gray-500 text-lg">Loading team data...</p>
          </div>
        ) : team.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-gray-500 text-lg">No team members found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                </tr>
              </thead>
              <tbody>
                {team.map((member) => (
                  <tr key={member.id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {member.name}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {member.email}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Team;
