import { BrowserWindow } from "electron";

export class ReceiptPrinter {

    async print(html: string): Promise<void> {

        const window = new BrowserWindow({
            show: false,
            autoHideMenuBar: true,
            webPreferences: {
                sandbox: false,
            },
        });

        try {

            await window.loadURL(
                `data:text/html;charset=utf-8,${encodeURIComponent(html)}`,
            );

            await new Promise<void>((resolve, reject) => {

                window.webContents.print(
                    {
                        silent: false,
                        printBackground: true,
                        color: false,
                        margins: {
                            marginType: "none",
                        },
                    },
                    (success, failureReason) => {

                        if (!success) {
                            reject(new Error(failureReason));
                            return;
                        }

                        resolve();
                    },
                );

            });

        } finally {

            if (!window.isDestroyed()) {
                window.close();
            }

        }

    }

}