import { X } from "lucide-react";
import { useState } from "react";

const SkillsSection = ({ userData, isOwnProfile, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [skills, setSkills] = useState(userData.skills || []);
  const [newSkill, setNewSkill] = useState("");

  function handleAddSkill() {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  }

  function handleDeleteSkill(skill) {
    setSkills(skills.filter((s) => s !== skill));
  }

  function handleSave() {
    onSave({ skills });
    setIsEditing(false);
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Skills</h2>

      <div className="flex flex-wrap">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm mr-2 mb-2 flex items-center"
          >
            {skill}
            {isEditing && (
              <button
                onClick={() => handleDeleteSkill(skill)}
                className="ml-2 text-red-500 cursor-pointer"
                title="Delete"
                aria-label="Delete"
              >
                <X size={14} />
              </button>
            )}
          </span>
        ))}
      </div>

      {isEditing && (
        <div className="mt-4 flex">
          <input
            type="text"
            placeholder="New Skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className="flex-grow p-2 border rounded-l"
          />
          <button
            onClick={handleAddSkill}
            className="bg-primary text-white py-2 px-4 rounded-r hover:bg-primary-dark transition duration-300 cursor-pointer"
            title="Add Skill"
            aria-label="Add Skill"
          >
            Add Skill
          </button>
        </div>
      )}

      {isOwnProfile && (
        <>
          {isEditing ? (
            <button
              onClick={handleSave}
              className="mt-4 bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300 cursor-pointer"
              title="Save Changes"
              aria-label="Save Changes"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 text-primary hover:text-primary-dark transition duration-300 cursor-pointer"
              title="Edit Skills"
              aria-label="Edit Skills"
            >
              Edit Skills
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default SkillsSection;
