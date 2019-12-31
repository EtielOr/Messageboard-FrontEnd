

export const fixDate = (date) => {
    const tempDate = new Date(date);
    return tempDate.toLocaleTimeString() + " " + tempDate.toLocaleDateString();
}