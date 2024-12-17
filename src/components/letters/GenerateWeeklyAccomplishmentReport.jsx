import React from "react";
import { Page, Image, Document, StyleSheet, View } from "@react-pdf/renderer";
import image1 from "../../assets/images/logo/head.png";
import image2 from "../../assets/images/logo/CITC_LOGO.png";
import { Table, TH, TR, TD } from "@ag-media/react-pdf-table";
import { formatDateOnly } from "../../utils/formatDate";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "left",
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
    textAlign: "left",
    fontSize: 11,
    padding: 5,
  },
  tableCell: {
    textAlign: "center",
    fontSize: 11,
    padding: 5,
  },
});

const GenerateWeeklyAccomplishmentReport = ({
  imageHeight = 80,
  weeklyEntries = [],
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
              <TD style={styles.tableHeader}>Week Number</TD>
              <TD style={styles.tableHeader}>Start Date</TD>
              <TD style={styles.tableHeader}>End Date</TD>
              <TD style={styles.tableHeader}>Tasks</TD>
              <TD style={styles.tableHeader}>Learnings</TD>
              <TD style={styles.tableHeader}>No. of Hours</TD>
            </TH>

            {/* Body Rows */}
            {weeklyEntries.map((record, index) => (
              <TR key={index}>
                <TD style={styles.tableCell}>{record.week_number}</TD>
                <TD style={styles.tableCell}>
                  {formatDateOnly(record.start_date)}
                </TD>
                <TD style={styles.tableCell}>
                  {formatDateOnly(record.end_date)}
                </TD>
                <TD style={styles.tableCell}>{record.tasks}</TD>
                <TD style={styles.tableCell}>{record.learnings}</TD>
                <TD style={styles.tableCell}>{record.no_of_hours}</TD>
              </TR>
            ))}
          </Table>
        </View>
      </Page>
    </Document>
  );
};

export default GenerateWeeklyAccomplishmentReport;
