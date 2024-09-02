import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const MultiSelect = ({ selectedPatients, setSelectedPatients }) => {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([]);
  const [show, setShow] = useState(false);
  const dropdownRef = useRef(null);
  const trigger = useRef(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/patients');
        const patients = response.data.map((patient) => ({
          value: patient._id,
          text: patient.name,
          selected: false,
        }));
        setOptions(patients);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  const open = () => {
    setShow(true);
  };

  const isOpen = () => {
    return show === true;
  };

  const select = (index, event) => {
    const newOptions = [...options];
    const selectedPatientId = newOptions[index].value;

    if (!newOptions[index].selected) {
      newOptions[index].selected = true;
      setSelected([...selected, index]);
      setSelectedPatients([...selectedPatients, selectedPatientId]); // Add selected patient ID
    } else {
      const selectedIndex = selected.indexOf(index);
      if (selectedIndex !== -1) {
        newOptions[index].selected = false;
        setSelected(selected.filter((i) => i !== index));
        setSelectedPatients(selectedPatients.filter(id => id !== selectedPatientId)); // Remove unselected patient ID
      }
    }

    setOptions(newOptions);
  };

  const remove = (index) => {
    const newOptions = [...options];
    const selectedIndex = selected.indexOf(index);

    if (selectedIndex !== -1) {
      newOptions[index].selected = false;
      const selectedPatientId = newOptions[index].value;
      setSelected(selected.filter((i) => i !== index));
      setSelectedPatients(selectedPatients.filter(id => id !== selectedPatientId)); // Remove patient ID
      setOptions(newOptions);
    }
  };

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdownRef.current) return;
      if (!show || dropdownRef.current.contains(target) || trigger.current.contains(target)) return;
      setShow(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  return (
    <div className="relative z-50">
      <input name="values" type="hidden" value={selectedPatients.join(',')} />
      <div className="relative z-20 inline-block w-full">
        <div className="relative flex flex-col items-center">
          <div ref={trigger} onClick={open} className="w-full">
            <div className="mb-2 flex rounded border py-2 pl-3 pr-3 outline-none transition">
              <div className="flex flex-auto flex-wrap gap-3">
                {selected.map((index) => (
                  <div
                    key={index}
                    className="my-1.5 flex items-center justify-center rounded border px-2.5 py-1.5 text-sm font-medium"
                  >
                    <div className="max-w-full flex-initial">{options[index].text}</div>
                    <div className="flex flex-auto flex-row-reverse">
                      <div onClick={() => remove(index)} className="cursor-pointer pl-2 hover:text-danger">
                        <svg
                          className="fill-current"
                          role="button"
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M9.35355 3.35355C9.54882 3.15829 9.54882 2.84171 9.35355 2.64645C9.15829 2.45118 8.84171 2.45118 8.64645 2.64645L6 5.29289L3.35355 2.64645C3.15829 2.45118 2.84171 2.45118 2.64645 2.64645C2.45118 2.84171 2.45118 3.15829 2.64645 3.35355L5.29289 6L2.64645 8.64645C2.45118 8.84171 2.45118 9.15829 2.64645 9.35355C2.84171 9.54882 3.15829 9.54882 3.35355 9.35355L6 6.70711L8.64645 9.35355C8.84171 9.54882 9.15829 9.54882 9.35355 9.35355C9.54882 9.15829 9.54882 8.84171 9.35355 8.64645L6.70711 6L9.35355 3.35355Z"
                            fill="#A0AEC0"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="ml-auto cursor-pointer px-1">
                <svg
                  className={`fill-current text-black dark:text-white ${show && 'rotate-180'}`}
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="#333"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        {isOpen() && (
          <div ref={dropdownRef} className="absolute top-full z-40 mt-1 w-full rounded border bg-white py-1 shadow-lg">
            <ul className="h-48 overflow-auto">
              {options.map((option, index) => (
                <li
                  key={index}
                  onClick={(e) => select(index, e)}
                  className={`cursor-pointer select-none px-4 py-2 hover:bg-gray-100 ${
                    option.selected ? 'bg-primary text-white' : 'text-black'
                  }`}
                >
                  {option.text}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelect;
