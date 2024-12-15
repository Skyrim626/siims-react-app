import React from "react";
import { Page, Image, Document, StyleSheet, View } from "@react-pdf/renderer";
import image1 from "../../assets/images/logo/head.png";
import image2 from "../../assets/images/logo/CITC_LOGO.png";
import { Table, TH, TR, TD } from "@ag-media/react-pdf-table";

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

const getStatusStyle = (status) => {
  switch (status) {
    case "In":
      return { backgroundColor: "#38a169" }; // Green
    case "Out":
      return { backgroundColor: "#718096" }; // Gray
    case "On Break":
      return { backgroundColor: "#ecc94b" }; // Yellow
    case "Off":
      return { backgroundColor: "#4299e1" }; // Blue
    case "Overtime":
      return { backgroundColor: "#e53e3e" }; // Red
    case "Leave":
      return { backgroundColor: "#9f7aea" }; // Purple
    case "Absent":
      return { backgroundColor: "#ed8936" }; // Orange
    case "Holiday":
      return { backgroundColor: "#319795" }; // Teal
    case "Late":
      return { backgroundColor: "#d53f8c" }; // Pink
    case "Early Out":
      return { backgroundColor: "#667eea" }; // Indigo
    default:
      return { backgroundColor: "#e2e8f0", color: "black" }; // Gray
  }
};

const GenerateDailyTimeRecord = ({
  imageHeight = 80,
  dailyTimeRecords = [],
}) => {
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
              <TD style={styles.tableHeader}>Status</TD>
            </TH>

            {/* Body Rows */}
            {dailyTimeRecords.map((record, index) => (
              <TR key={index}>
                <TD style={styles.tableCell}>{record.date}</TD>
                <TD style={styles.tableCell}>{record.time_in}</TD>
                <TD style={styles.tableCell}>{record.time_out}</TD>
                <TD style={styles.tableCell}>{record.hours_received}</TD>
                <TD
                  style={{
                    ...styles.statusCell,
                    ...getStatusStyle(record.status_name),
                  }}
                >
                  {record.status_name}
                </TD>
              </TR>
            ))}
          </Table>
        </View>
      </Page>
    </Document>
  );
};

export default GenerateDailyTimeRecord;
