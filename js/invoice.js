export function ultraInvoice(data){

const { jsPDF }=window.jspdf;

const pdf=new jsPDF();

pdf.setFontSize(18);
pdf.text("Wanci International Lodge",20,20);

pdf.setFontSize(12);

pdf.text("Guest: "+data.guest,20,40);
pdf.text("Room: "+data.roomNumber,20,50);
pdf.text("Bill: $"+(data.totalBill||0),20,60);
pdf.text("Status: "+data.status,20,70);

pdf.save("invoice.pdf");
}
