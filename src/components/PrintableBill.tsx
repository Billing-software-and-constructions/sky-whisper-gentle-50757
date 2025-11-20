import { format } from "date-fns";

interface PrintableBillProps {
  customerName: string;
  billItems: Array<{
    categoryName: string;
    subcategoryName: string;
    weight: number;
    goldAmount: number;
    seikuliAmount: number;
    seikuliRate: number;
  }>;
  oldOrnaments: Array<{
    categoryName: string;
    subcategoryName: string;
    initialWeight: number;
    finalWeight: number;
    metalRate: number;
    value: number;
  }>;
  goldRate: number;
  silverRate?: number;
  gstPercentage: number;
  subtotal: number;
  gstAmount: number;
  grandTotal: number;
  exchangeType: string;
}

export const PrintableBill = ({
  customerName,
  billItems,
  oldOrnaments,
  goldRate,
  silverRate,
  gstPercentage,
  subtotal,
  gstAmount,
  grandTotal,
  exchangeType,
}: PrintableBillProps) => {
  const totalOldOrnamentValue = oldOrnaments.reduce((sum, item) => sum + item.value, 0);
  const cgstAmount = gstAmount / 2;
  const sgstAmount = gstAmount / 2;
  
  return (
    <div className="printable-bill hidden print:block print:w-full print:max-w-[210mm] print:mx-auto print:bg-white print:text-black print:p-6">
      {/* Header Section */}
      <div className="border-2 border-black mb-2">
        <div className="text-center py-2 border-b border-black">
          <h1 className="text-xl font-bold">MGM JEWELLERS</h1>
          <p className="text-xs mt-1">
            326/1 Rajapalayam Main Road, Sankarankovil-627756
            <br />
            Ph: 9842112416
          </p>
        </div>
        
        <div className="text-center py-2 border-b border-black">
          <p className="text-xs font-semibold">Government of India State of Karnataka</p>
          <p className="text-xs font-semibold">Form GST INV-1</p>
          <p className="text-xs">(SEE RULE 46 OF CGST RULES 2017)</p>
          <p className="text-sm font-bold mt-1">SALE INVOICE</p>
        </div>

        {/* Company and Customer Details */}
        <div className="grid grid-cols-2 gap-4 p-3 text-xs border-b border-black">
          <div>
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="font-semibold py-0.5">GSTIN</td>
                  <td className="py-0.5">: 33ABLFM1188M1ZU</td>
                </tr>
                <tr>
                  <td className="font-semibold py-0.5">Name</td>
                  <td className="py-0.5">: MGM JEWELLERS</td>
                </tr>
                <tr>
                  <td className="font-semibold py-0.5 align-top">Address</td>
                  <td className="py-0.5">: 326/1 Rajapalayam Main Road,<br />Sankarankovil-627756</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="font-semibold py-0.5">SI No of Invoice</td>
                  <td className="py-0.5">: {format(new Date(), "yyyyMMddHHmmss")}</td>
                </tr>
                <tr>
                  <td className="font-semibold py-0.5">Date of Invoice</td>
                  <td className="py-0.5">: {format(new Date(), "dd/MM/yyyy")}</td>
                </tr>
                <tr>
                  <td className="font-semibold py-0.5">PAN NO</td>
                  <td className="py-0.5">: ABLFM1188M</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Receiver and Consignee Details */}
        <div className="grid grid-cols-2 gap-4 p-3 text-xs border-b border-black">
          <div>
            <p className="font-bold mb-1">Details of Receiver (Billed to)</p>
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="font-semibold py-0.5">Name</td>
                  <td className="py-0.5">: {customerName}</td>
                </tr>
                <tr>
                  <td className="font-semibold py-0.5">Address</td>
                  <td className="py-0.5">: Sankarankovil</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <p className="font-bold mb-1">Details of Consignee (Shipped to)</p>
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="font-semibold py-0.5">Name</td>
                  <td className="py-0.5">: {customerName}</td>
                </tr>
                <tr>
                  <td className="font-semibold py-0.5">Address</td>
                  <td className="py-0.5">: Sankarankovil</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Items Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b border-black">
                <th className="border-r border-black p-1 text-left">SL No.</th>
                <th className="border-r border-black p-1 text-left">DESCRIPTION OF GOODS</th>
                <th className="border-r border-black p-1">HSN-SAC</th>
                <th className="border-r border-black p-1">UOM</th>
                <th className="border-r border-black p-1">PCS</th>
                <th className="border-r border-black p-1">Gross Wt CT-Stone</th>
                <th className="border-r border-black p-1">Claim CT</th>
                <th className="border-r border-black p-1">Net Wt.</th>
                <th className="border-r border-black p-1">Metal Value</th>
                <th className="border-r border-black p-1">V A</th>
                <th className="border-r border-black p-1">Stone Value</th>
                <th className="border-r border-black p-1">Total Value</th>
                <th className="border-r border-black p-1">Disc Amt.</th>
                <th className="p-1">Taxable Value</th>
              </tr>
            </thead>
            <tbody>
              {billItems.map((item, index) => {
                const totalItemValue = item.goldAmount + item.seikuliAmount;
                const taxableValue = totalItemValue / (1 + gstPercentage / 100);
                return (
                  <tr key={index} className="border-b border-black">
                    <td className="border-r border-black p-1">{index + 1}</td>
                    <td className="border-r border-black p-1">
                      {item.categoryName} - {item.subcategoryName}
                    </td>
                    <td className="border-r border-black p-1 text-center">71131919</td>
                    <td className="border-r border-black p-1 text-center">g</td>
                    <td className="border-r border-black p-1 text-center">1</td>
                    <td className="border-r border-black p-1 text-right">{item.weight.toFixed(3)}</td>
                    <td className="border-r border-black p-1 text-right">0.000</td>
                    <td className="border-r border-black p-1 text-right">{item.weight.toFixed(3)}</td>
                    <td className="border-r border-black p-1 text-right">₹{item.goldAmount.toFixed(2)}</td>
                    <td className="border-r border-black p-1 text-right">₹{item.seikuliAmount.toFixed(2)}</td>
                    <td className="border-r border-black p-1 text-right">0.00</td>
                    <td className="border-r border-black p-1 text-right">₹{totalItemValue.toFixed(2)}</td>
                    <td className="border-r border-black p-1 text-right">0.00</td>
                    <td className="p-1 text-right">₹{taxableValue.toFixed(2)}</td>
                  </tr>
                );
              })}
              
              {oldOrnaments.map((item, index) => (
                <tr key={`old-${index}`} className="border-b border-black">
                  <td className="border-r border-black p-1">{billItems.length + index + 1}</td>
                  <td className="border-r border-black p-1 text-orange-700">
                    {item.categoryName} - {item.subcategoryName} (Exchange)
                  </td>
                  <td className="border-r border-black p-1 text-center">71131919</td>
                  <td className="border-r border-black p-1 text-center">g</td>
                  <td className="border-r border-black p-1 text-center">1</td>
                  <td className="border-r border-black p-1 text-right">{item.initialWeight.toFixed(3)}</td>
                  <td className="border-r border-black p-1 text-right">0.000</td>
                  <td className="border-r border-black p-1 text-right">{item.finalWeight.toFixed(3)}</td>
                  <td className="border-r border-black p-1 text-right text-orange-700">-₹{item.value.toFixed(2)}</td>
                  <td className="border-r border-black p-1 text-right">0.00</td>
                  <td className="border-r border-black p-1 text-right">0.00</td>
                  <td className="border-r border-black p-1 text-right text-orange-700">-₹{item.value.toFixed(2)}</td>
                  <td className="border-r border-black p-1 text-right">0.00</td>
                  <td className="p-1 text-right text-orange-700">-₹{item.value.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals Section */}
        <div className="grid grid-cols-2 gap-4 p-3 text-xs border-t border-black">
          <div>
            <p className="font-semibold mb-2">Bank Details:</p>
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="py-0.5">A/C No</td>
                  <td className="py-0.5">: 40836933733</td>
                </tr>
                <tr>
                  <td className="py-0.5">Bank</td>
                  <td className="py-0.5">: State Bank of India</td>
                </tr>
                <tr>
                  <td className="py-0.5">IFSC Code</td>
                  <td className="py-0.5">: SBIN0071235</td>
                </tr>
                <tr>
                  <td className="py-0.5">Branch</td>
                  <td className="py-0.5">: Sankarankovil branch</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <table className="w-full">
              <tbody>
                {exchangeType === "buy-ornaments" ? (
                  <>
                    <tr>
                      <td className="py-1">Taxable Value</td>
                      <td className="py-1 text-right">₹{subtotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="py-1">CGST - {gstPercentage / 2}%</td>
                      <td className="py-1 text-right">₹{cgstAmount.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="py-1">SGST - {gstPercentage / 2}%</td>
                      <td className="py-1 text-right">₹{sgstAmount.toFixed(2)}</td>
                    </tr>
                    <tr className="font-semibold border-t border-black">
                      <td className="py-1">Total Invoice Value (in Figure)</td>
                      <td className="py-1 text-right">₹{(subtotal + gstAmount).toFixed(2)}</td>
                    </tr>
                    {totalOldOrnamentValue > 0 && (
                      <>
                        <tr className="text-orange-700">
                          <td className="py-1">Total Exchange Value</td>
                          <td className="py-1 text-right">-₹{totalOldOrnamentValue.toFixed(2)}</td>
                        </tr>
                        <tr className="font-bold border-t-2 border-black">
                          <td className="py-1">NET PAYABLE</td>
                          <td className="py-1 text-right">₹{grandTotal.toFixed(2)}</td>
                        </tr>
                      </>
                    )}
                    {totalOldOrnamentValue === 0 && (
                      <tr className="font-bold border-t-2 border-black">
                        <td className="py-1">CASH</td>
                        <td className="py-1 text-right">₹{grandTotal.toFixed(2)}</td>
                      </tr>
                    )}
                  </>
                ) : (
                  <tr className="font-bold border-t-2 border-black">
                    <td className="py-1">CASH AMOUNT</td>
                    <td className="py-1 text-right">₹{totalOldOrnamentValue.toFixed(2)}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Terms and Signature */}
        <div className="grid grid-cols-2 gap-4 p-3 text-xs border-t border-black">
          <div>
            <p className="font-semibold mb-1">Terms and Conditions:</p>
            <p className="text-[10px] leading-relaxed">
              This invoice is applicable only for Gold, Diamond and Precious ornaments. 
              In addition to the indication of separate description of each article, 
              net weight of precious metal, purity in carat and fineness, gross weight 
              in bill or invoice or sale of hallmarked precious metal articles.
            </p>
          </div>
          <div className="text-right">
            <p className="font-semibold mb-8">For MGM JEWELLERS</p>
            <p className="mt-8 border-t border-black pt-1 inline-block px-4">Authorized Signatory</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-2 text-xs">
        <p className="italic">This is a computer generated invoice and needs no signature.</p>
        <p className="mt-1 text-[10px]">Powered by Techverse Infotech</p>
      </div>
    </div>
  );
};
