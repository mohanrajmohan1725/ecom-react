import emailjs from "emailjs-com";

export const sendInvoiceEmail = async (order, pdfDataURL) => {
  try {
    await emailjs.send(
      "YOUR_SERVICE_ID",
      "YOUR_TEMPLATE_ID",
      {
        to_email: order.user.email,
        invoice_id: order.invoiceId,
        total_amount: order.total,
        date: order.date,
        invoice_pdf: pdfDataURL,  // attachment
      },
      "YOUR_PUBLIC_KEY"
    );

    alert("Invoice sent to your email!");
  } catch (err) {
    console.error("Email Error:", err);
    alert("Failed to send email.");
  }
};
