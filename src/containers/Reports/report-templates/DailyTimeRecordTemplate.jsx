import React from "react";
import { Page, Image, Document, StyleSheet, View } from "@react-pdf/renderer";
import image1 from "../../../assets/images/logo/head.png";
import image2 from "../../../assets/images/logo/CITC_LOGO.png";
import { Table, TH, TR, TD } from "@ag-media/react-pdf-table";
import { formatDate } from "../../../_global/utilities/formatDate";
import { formatTime } from "../../../_global/utilities/formatTime";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  image1: {
    flexGrow: 1,
    height: 150,
    objectFit: "cover",
  },
  image2: {
    flexGrow: 1,
    height: 40,
    objectFit: "cover",
  },
  tableHeader: {
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 11,
    padding: 5,
  },
  tableCell: {
    textAlign: "center",
    fontSize: 11,
    padding: 5,
  },
  statusCell: {
    textAlign: "center",
    fontSize: 11,
    padding: 5,
    color: "white",
  },
});

const DailyTimeRecordTemplate = ({ imageHeight = 80, records = [] }) => {
  return (
    <Document>
      <Page size="A4" style={styles.body}>
        {/* Header with 2 images */}
        <View style={styles.headerContainer} fixed>
          <Image
            src={image1}
            style={{ ...styles.image1, height: imageHeight }}
          />
          <Image
            src={image2}
            style={{ ...styles.image2, height: imageHeight }}
          />
        </View>

        {/* Table Area */}
        <View>
          <Table>
            {/* Header Row */}
            <TH>
              <TD style={styles.tableHeader}>Date</TD>
              <TD style={styles.tableHeader}>Time In</TD>
              <TD style={styles.tableHeader}>Time Out</TD>
              <TD style={styles.tableHeader}>Hours Received</TD>
            </TH>

            {/* Body Rows */}
            {records.map((record, index) => (
              <TR key={index}>
                <TD style={styles.tableCell}>{formatDate(record.date)}</TD>
                <TD style={styles.tableCell}>{formatTime(record.time_in)}</TD>
                <TD style={styles.tableCell}>{formatTime(record.time_out)}</TD>
                <TD style={styles.tableCell}>{record.hours_received}</TD>
              </TR>
            ))}
          </Table>
        </View>
      </Page>
    </Document>
  );
};

export default DailyTimeRecordTemplate;
