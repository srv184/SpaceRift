export async function loadHeaderFooter() {
  try {
    const [headerRes, footerRes] = await Promise.all([
      fetch("components/header.html"),
      fetch("components/footer.html"),
    ]);

    if (!headerRes.ok || !footerRes.ok) {
      throw new Error("Header or Footer file missing");
    }

    document.getElementById("headerContainer").innerHTML =
      await headerRes.text();
    document.getElementById("footerContainer").innerHTML =
      await footerRes.text();
  } catch (error) {
    console.error("❌ Failed to load header/footer:", error);
  }
}
