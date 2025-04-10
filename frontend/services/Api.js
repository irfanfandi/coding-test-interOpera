export const postAI = async ({ body }) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ai`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  if (!data || !data.answer) {
    throw new Error("Invalid response format");
  }
  return data;
};

export const getDataSales = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sales-reps`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();

  if (!data.salesReps) {
    throw new Error("Invalid data format received");
  }

  return data;
};
