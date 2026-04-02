const uploadFile = async () => {
  try {
    if (!file) return alert("Select a file first");

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(
      "https://ai-detector-backend-866l.onrender.com/detect/",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!res.ok) {
      throw new Error("Server error");
    }

    const data = await res.json();
    console.log(data);

    setResult(data.result);
  } catch (err) {
    console.error(err);
    alert("Error connecting to backend");
  }
};