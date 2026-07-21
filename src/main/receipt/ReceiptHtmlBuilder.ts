import type { OrderDetailsDto } from "../../shared/order";
import { formatCurrency } from "../../shared/utils/currency";

export class ReceiptHtmlBuilder {

    build(order: OrderDetailsDto): string {

        const cgst = order.gstAmount / 2;
        const sgst = order.gstAmount / 2;

        const totalQuantity = order.items.reduce(
            (sum, item) => sum + item.quantity,
            0,
        );

        const itemsHtml = order.items.map(item => {

            const addonsHtml = item.addons.map(addon => `
                <tr class="addon-row">
                    <td class="addon" colspan="2">
                        + ${addon.name}
                    </td>

                    <td class="price">
                        ${formatCurrency(addon.price)}
                    </td>
                </tr>
            `).join("");

            const notesHtml = item.notes
                ? `
                <tr>
                    <td colspan="3" class="notes">
                        Note: ${item.notes}
                    </td>
                </tr>
                `
                : "";

            const addonsTotal = item.addons.reduce(
                (sum, addon) => sum + addon.price,
                0,
            );

            const lineTotal =
                (item.unitPrice + addonsTotal) * item.quantity;

            return `
                <tr class="item-row">

                    <td class="item">
                        ${item.menuItemName}
                    </td>

                    <td class="qty">
                        ${item.quantity}
                    </td>

                    <td class="price">
                        ${formatCurrency(lineTotal)}
                    </td>

                </tr>

                ${addonsHtml}

                ${notesHtml}

                <tr class="spacer">
                    <td colspan="3"></td>
                </tr>
                `;
                        }).join("");

                        return `
                <!DOCTYPE html>

                <html>

                <head>

                <meta charset="UTF-8"/>

                <style>

                *{
                    box-sizing:border-box;
                    font-family:monospace;
                }

                body{

                    width:58mm;

                    margin:0 auto;

                    padding:8px;

                    color:#000;

                    font-size:12px;

                }

                .center{
                    text-align:center;
                }

                .header-title{

                    font-size:20px;

                    font-weight:bold;

                    margin:0;

                }

                .invoice{

                    margin-top:4px;

                    margin-bottom:8px;

                    font-weight:bold;

                    font-size:13px;

                }

                .address{

                    line-height:1.35;

                }

                .separator{

                    border-top:1px dashed #000;

                    margin:8px 0;

                }

                .heavy{

                    border-top:2px solid #000;

                    margin:8px 0;

                }

                table{

                    width:100%;

                    border-collapse:collapse;

                }

                td,th{

                    padding:2px 0;

                    vertical-align:top;

                }

                th{

                    font-weight:bold;

                }

                .item{

                    font-weight:bold;

                }

                .qty{

                    width:35px;

                    text-align:center;

                }

                .price{

                    width:72px;

                    text-align:right;

                }

                .addon{

                    padding-left:14px;

                    font-size:11px;

                }

                .notes{

                    padding-left:14px;

                    font-size:11px;

                    font-style:italic;

                }

                .spacer td{

                    padding-top:6px;

                }

                .grand-total{

                    font-size:18px;

                    font-weight:900;

                }

                .small{

                    font-size:11px;

                }

                @page{
                    size:58mm auto;
                    margin:0;
                }

                </style>

                </head>

                <body>

                <div class="center">

                    <div class="header-title">
                        EVERYDAY BREW
                    </div>

                    <div class="invoice">
                        RETAIL INVOICE
                    </div>

                    <div class="address">
                        Great Coffee. Everyday.<br/>
                        Near Odhav Baug-2, Madhapar Road<br/>
                        Madhapar, Bhuj
                    </div>

                </div>

                <div class="separator"></div>

                <table>

                <tr>

                    <td>Bill No.</td>

                    <td colspan="2" class="price">
                        ${order.billNumber}
                    </td>

                </tr>

                <tr>

                    <td>Date</td>

                    <td colspan="2" class="price">
                        ${new Date(order.completedAt).toLocaleString()}
                    </td>

                </tr>

                <tr>

                    <td>Payment</td>

                    <td colspan="2" class="price">
                        ${order.paymentMethod.toUpperCase()}
                    </td>

                </tr>

                </table>

                <div class="separator"></div>

                <table>

                <tr>

                    <th align="left">
                        Item
                    </th>

                    <th class="qty">
                        Qty
                    </th>

                    <th align="right">
                        Amount
                    </th>

                </tr>

                ${itemsHtml}

                </table>

                <div class="separator"></div>

                <table>

                <tr>

                    <td>
                        Total Qty
                    </td>

                    <td></td>

                    <td class="price">
                        ${totalQuantity}
                    </td>

                </tr>

                <tr>

                    <td>
                        Subtotal
                    </td>

                    <td></td>

                    <td class="price">
                        ${formatCurrency(order.subtotal)}
                    </td>

                </tr>

                <tr>

                    <td colspan="3" class="small">
                        (Net Total Inclusive of GST)
                    </td>

                </tr>

                <tr>

                    <td>
                        CGST @2.5%
                    </td>

                    <td></td>

                    <td class="price">
                        ${formatCurrency(cgst)}
                    </td>

                </tr>

                <tr>

                    <td>
                        SGST @2.5%
                    </td>

                    <td></td>

                    <td class="price">
                        ${formatCurrency(sgst)}
                    </td>

                </tr>

                </table>

                <div class="heavy"></div>

                <table>

                <tr class="grand-total">

                    <td>
                        GRAND TOTAL
                    </td>

                    <td></td>

                    <td class="price">
                        ${formatCurrency(order.grandTotal)}
                    </td>

                </tr>

                </table>

                <div class="heavy"></div>

                <div class="center">

                    Thank You!<br/><br/>

                    Visit Again

                </div>

                </body>

                </html>
            `;
    }

}