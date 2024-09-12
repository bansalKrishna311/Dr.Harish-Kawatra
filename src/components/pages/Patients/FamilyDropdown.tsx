import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

type FamilyDropdownProps = {
  patient_id: string;
};

type FamilyOption = {
  value: string;
  label: string;
};

const FamilyDropdown: React.FC<FamilyDropdownProps> = ({ patient_id }) => {
  const [families, setFamilies] = useState<FamilyOption[]>([]);
  const [selectedFamily, setSelectedFamily] = useState<FamilyOption | null>(null);

  useEffect(() => {
    const fetchFamilies = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/families'); // Update with your actual endpoint
        const familyOptions = response.data.map((family: any) => ({
          value: family._id,
          label: family.name,
        }));
        setFamilies(familyOptions);
      } catch (error) {
        console.error('Error fetching families:', error);
      }
    };

    fetchFamilies();
  }, []);

  const handleFamilyChange = async (selectedOption: FamilyOption | null) => {
    setSelectedFamily(selectedOption);

    if (selectedOption) {
      try {
        // API call to update the patient's family in the backend
        await axios.put(`http://localhost:4000/api/v1/patients/${patient_id}/family`, {
          familyId: selectedOption.value,
        });
        console.log(`Patient ${patient_id} added to family ${selectedOption.label}`);
      } catch (error) {
        console.error('Error updating family for patient:', error);
      }
    }
  };

  return (
    <Select
      options={families}
      value={selectedFamily}
      onChange={handleFamilyChange}
      className="w-full dark:border-strokedark"
      classNamePrefix="react-select"
      isClearable
      placeholder="Select a family"
    />
  );
};

export default FamilyDropdown;
