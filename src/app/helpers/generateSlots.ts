const generateSlots = (
  startTime: string,
  endTime: string,
  slotDuration: number,
) => {
  const toMinutes = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const toTimeString = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
  };

  const startMinutes = toMinutes(startTime);
  const endMinutes = toMinutes(endTime);
  const totalDuration = endMinutes - startMinutes;
  const numberOfSlots = totalDuration / slotDuration;

  const slots = [];

  for (let i = 0; i < numberOfSlots; i++) {
    const slotStart = startMinutes + i * slotDuration;
    const slotEnd = slotStart + slotDuration;
    slots.push({
      startTime: toTimeString(slotStart),
      endTime: toTimeString(slotEnd),
      isBooked: false,
    });
  }

  return slots;
};

export default generateSlots;
