import React from "react";

import { pdfjs } from "react-pdf";

// /* Template theme */
// import "./styles.scss";

/* Template */
import ResourceWiseReport from "./ResourceReport";

/* PDF Render */
import { Font } from "@react-pdf/renderer";

/* Assets */
import TinesBold from "../Assets/fonts/Tinos-Bold.ttf";
import TinosRegular from "../Assets/fonts/Tinos-Regular.ttf";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

Font.register({
    family: "Tinos",
    fonts: [
        {
            src: TinosRegular,
            fontWeight: 400
        },
        {
            src: TinesBold,
            fontWeight: 700
        }
    ]
});

function DashboardTemplate({ dashboardTemplateType, ...props }) {
    // React.useLayoutEffect(() => {}, []);

    return <ResourceWiseReport {...props} />;
}

export default DashboardTemplate;
