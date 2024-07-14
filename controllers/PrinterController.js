const escpos = require('escpos');
escpos.USB = require('escpos-usb');
const device  = new escpos.USB();
const printer = new escpos.Printer(device, options);

const printReceipt = async (order) => {
    try {
        device.open((error) => {
            if (error) {
                console.error('Error opening device:', error);
                return;
            }

            printer
                .font('a')
                .align('ct')
                .style('b')
                .size(1, 1)
                .text('Company Name')
                .text('Address Line 1')
                .text('Address Line 2')
                .text('Phone: 123-456-7890')
                .text('========================')
                .align('lt')
                .text(`Order ID: ${order.id}`)
                .text(`Date: ${new Date(order.date).toLocaleString()}`)
                .text('------------------------')
                .tableCustom([
                    { text: 'Item', align: 'LEFT', width: 0.5 },
                    { text: 'Qty', align: 'CENTER', width: 0.2 },
                    { text: 'Price', align: 'RIGHT', width: 0.3 }
                ])
                .text('------------------------');

            order.items.forEach(item => {
                printer.tableCustom([
                    { text: item.name, align: 'LEFT', width: 0.5 },
                    { text: item.quantity.toString(), align: 'CENTER', width: 0.2 },
                    { text: `$${item.price.toFixed(2)}`, align: 'RIGHT', width: 0.3 }
                ]);
            });

            printer
                .text('------------------------')
                .tableCustom([
                    { text: 'Total', align: 'LEFT', width: 0.5 },
                    { text: '', align: 'CENTER', width: 0.2 },
                    { text: `$${order.total.toFixed(2)}`, align: 'RIGHT', width: 0.3 }
                ])
                .text('========================')
                .align('ct')
                .text('Thank you for your purchase!')
                .cut()
                .close();
        });
    } catch (error) {
        console.error('Error printing receipt:', error);
    }
};

const handlePrint = async (req, res) => {
    const order = req.body;

    printReceipt(order)
        .then(() => res.status(200).send('Receipt printed successfully'))
        .catch((error) => res.status(500).send('Failed to print receipt'));
}


module.exports = printReceipt;
