import { getCurrentTime } from '@/libs/constants';
import { FormTimingProps } from '@/libs/interfaces';
import { CirclePlus, Trash2 } from 'lucide-react';
import React, { FC, useState } from 'react';

const defaultTime = { start: getCurrentTime(), end: getCurrentTime() };

const FormTiming: FC<FormTimingProps> = ({ timings, setTimings }) => {
  const handleToggle = (index: number) => {
    const updated = [...timings];
    updated[index].enabled = !updated[index].enabled;
    setTimings(updated);
  };
  const handleTimeChange = (
    dayIndex: number,
    slotIndex: number,
    field: 'start' | 'end',
    value: string
  ) => {
    const updated = [...timings];
    updated[dayIndex].slots[slotIndex][field] = value;
    setTimings(updated);
  };

  const handleAddSlot = (dayIndex: number) => {
    const updated = [...timings];
    updated[dayIndex].slots.push({ ...defaultTime });
    setTimings(updated);
  };
  const handleDeleteSlot = (dayIndex: number, slotIndex: number) => {
    const updated = [...timings];
    updated[dayIndex].slots.splice(slotIndex, 1);
    setTimings(updated);
  };

  return (
    <div className="w-full max-w-5xl mx-auto overflow-x-scroll hide-scrollbar">
      <h2 className="text-lg font-semibold font-display mb-6">Restaurant Timings</h2>

      {/* Table Header with Bottom Border */}
      <div className="w-[90%] mx-auto grid grid-cols-3 items-center px-4 py-3 font-semibold text-sm border-b border-gray-300">
        <div className="text-left">Days</div>
        <div className="text-left border-l border-gray-200 pl-4">Start Time</div>
        <div className="text-left border-l border-gray-200 pl-4">End Time</div>
      </div>

      {/* Table Body */}
      {timings.map((day, dayIndex) => (
        <div key={day.day} className="w-[90%] mx-auto px-4 py-3 border-b border-gray-200">
          {day.slots.map((slot, slotIndex) => (
            <div key={slotIndex} className="grid grid-cols-3 gap-4 items-center py-2 text-sm">
              {/* Day + Toggle */}
              {slotIndex === 0 ? (
                <div className="flex items-center gap-4">
                  <span className="w-12 font-medium text-gray-700">{day.day}</span>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={day.enabled}
                      onChange={() => handleToggle(dayIndex)}
                    />
                    <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-(--darkprimary) relative transition">
                      <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:translate-x-5" />
                    </div>
                  </label>
                </div>
              ) : (
                <div />
              )}

              {/* Start Time Input */}
              <div className="border-l border-gray-200 pl-4">
                <input
                  type="time"
                  value={slot.start}
                  onChange={e => handleTimeChange(dayIndex, slotIndex, 'start', e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 w-full text-sm"
                  disabled={!day.enabled}
                />
              </div>

              {/* End Time + Add Button */}
              <div className="border-l border-gray-200 pl-4 flex items-center gap-5">
                <input
                  type="time"
                  value={slot.end}
                  onChange={e => handleTimeChange(dayIndex, slotIndex, 'end', e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 w-full text-sm"
                  disabled={!day.enabled}
                />

                {/* Add or Delete Button */}
                {day.slots.length > 1 && (
                  <button
                    onClick={() => handleDeleteSlot(dayIndex, slotIndex)}
                    disabled={!day.enabled}
                    className="text-red-500"
                    title="Delete slot"
                  >
                    <Trash2 size={18} />
                  </button>
                )}

                {slotIndex === day.slots.length - 1 && (
                  <button
                    onClick={() => handleAddSlot(dayIndex)}
                    disabled={!day.enabled}
                    className="text-(--darkprimary)"
                    title="Add slot"
                  >
                    <CirclePlus size={20} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FormTiming;
