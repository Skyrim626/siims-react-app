import React from "react";
import {
  Page,
  Image,
  Document,
  StyleSheet,
  View,
  Text,
} from "@react-pdf/renderer";
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
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  image1: {
    height: 80,
    width: "auto",
  },
  image2: {
    height: 80,
    width: "auto",
  },
  headerTitle: {
    textAlign: "center",
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 12,
    marginBottom: 10,
    textAlign: "center",
  },
  tableHeader: {
    backgroundColor: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 10,
    padding: 5,
    width: 50, // Fixed width for headers
  },
  criteriaHeader: {
    backgroundColor: "#FFFFFF",
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
    padding: 5,
    flex: 2, // Criteria column flex
  },
  tableCell: {
    fontSize: 10,
    textAlign: "center",
    justifyContent: "center",
    padding: 5,
    width: 50, // Fixed width for cells
  },
  criteriaCell: {
    fontSize: 10,
    textAlign: "center",
    padding: 5,
    flex: 2, // Flex for Criteria column
  },
  boldText: {
    fontWeight: "bold",
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
  },
  categoryRow: {
    backgroundColor: "#FFFFFF",
    fontWeight: "extrabold",
    fontFamily: "Helvetica-Bold",
    textAlign: "left",
    padding: 5,
    fontSize: 11,
    flex: 2, // Full width category column
  },
});

const GeneratePerformanceEvaluationReport = ({
  imageHeight = 80,
  criterias = [],
  scores,
  studentName = "",
  companyName = "",
  noOfTrainingHours = "",
  companyAddress = "",
  comments = "",
  jobTitle = "",
  officeName = "",
}) => {
  const tableBody = [];

  criterias.forEach((criterion, criterionIndex) => {
    // Add row for the category
    tableBody.push([
      {
        content: criterion.category,
        colSpan: 6, // Make the category row span the full table
        isCategory: true,
      },
    ]);

    // Add rows for the items under each category
    criterion.items.forEach((item, itemIndex) => {
      const scoreKey = `${criterionIndex}-${itemIndex}`;
      const score = scores[scoreKey] || "";

      const row = [item];
      [1, 2, 3, 4, 5].forEach((colScore) => {
        if (score == colScore) {
          row.push({
            content: "X",
          });
        } else {
          row.push("");
        }
      });
      tableBody.push(row);
    });
  });

  return (
    <Document>
      <Page size={"LEGAL"} style={styles.body}>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <Image src={image1} style={styles.image1} />
          <Image src={image2} style={styles.image2} />
        </View>
        {/* Report Title */}
        <View
          style={{
            marginBottom: 5,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontFamily: "Helvetica-Bold",
              textAlign: "center",
              fontSize: 14,
            }}
          >
            PERFORMANCE EVALUATION SHEET
          </Text>
        </View>
        {/* Student Name and Company Name */}
        <View
          style={{
            flexDirection: "row", // Places StudentName and CompanyName side by side
            justifyContent: "space-between", // Separates the two sections
            alignItems: "flex-end",
            marginVertical: 7, // Adds spacing above and below
            gap: 20, // Adds gap between sections
          }}
        >
          {/* Left Section - Student */}
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text
              style={{
                fontFamily: "Helvetica",
                fontWeight: "bold",
                fontSize: 12,
                marginBottom: 2, // Spacing between name and line
              }}
            >
              {studentName}
            </Text>
            <View
              style={{
                borderBottomWidth: 1, // Creates the underline
                borderColor: "black",
                flex: 1, // Stretches the underline
                alignSelf: "stretch", // Ensures it stretches fully
                marginBottom: 2, // Spacing between line and label
              }}
            />
            <Text
              style={{
                fontFamily: "Helvetica",
                fontSize: 10,
              }}
            >
              (Name of Student)
            </Text>
          </View>

          {/* Right Section - Company */}
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text
              style={{
                fontFamily: "Helvetica",
                fontWeight: "bold",
                fontSize: 12,
                marginBottom: 2, // Spacing between name and line
              }}
            >
              {companyName}
            </Text>
            <View
              style={{
                borderBottomWidth: 1, // Creates the underline
                borderColor: "black",
                flex: 1, // Stretches the underline
                alignSelf: "stretch", // Ensures it stretches fully
                marginBottom: 2, // Spacing between line and label
              }}
            />
            <Text
              style={{
                fontFamily: "Helvetica",
                fontSize: 10,
              }}
            >
              (Name of Company)
            </Text>
          </View>
        </View>
        {/* No. of Training Hours and Address of Company */}
        <View
          style={{
            flexDirection: "row", // Places StudentName and CompanyName side by side
            justifyContent: "space-between", // Separates the two sections
            alignItems: "flex-end",
            marginVertical: 7, // Adds spacing above and below
            gap: 20, // Adds gap between sections
          }}
        >
          {/* Left Section - Student */}
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text
              style={{
                fontFamily: "Helvetica",
                fontWeight: "bold",
                fontSize: 12,
                marginBottom: 2, // Spacing between name and line
              }}
            >
              {noOfTrainingHours}
            </Text>
            <View
              style={{
                borderBottomWidth: 1, // Creates the underline
                borderColor: "black",
                flex: 1, // Stretches the underline
                alignSelf: "stretch", // Ensures it stretches fully
                marginBottom: 2, // Spacing between line and label
              }}
            />
            <Text
              style={{
                fontFamily: "Helvetica",
                fontSize: 10,
              }}
            >
              (No. of Training Hours)
            </Text>
          </View>

          {/* Right Section - Company */}
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text
              style={{
                fontFamily: "Helvetica",
                fontWeight: "bold",
                fontSize: 12,
                marginBottom: 2, // Spacing between name and line
              }}
            >
              {companyAddress}
            </Text>
            <View
              style={{
                borderBottomWidth: 1, // Creates the underline
                borderColor: "black",
                flex: 1, // Stretches the underline
                alignSelf: "stretch", // Ensures it stretches fully
                marginBottom: 2, // Spacing between line and label
              }}
            />
            <Text
              style={{
                fontFamily: "Helvetica",
                fontSize: 10,
              }}
            >
              (Address of Company)
            </Text>
          </View>
        </View>
        {/* Directions */}
        <View
          style={{
            marginTop: 5,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              fontFamily: "Helvetica",
              fontSize: 12,
            }}
          >
            <Text style={{ ...styles.boldText }}>DIRECTIONS: </Text>
            <Text>
              Please mark <Text style={{ ...styles.boldText }}>(X)</Text> on the
              appropriate column the rating that best describes the performance
              of the student-trainee. Please use the ratings: five(5) as the
              highest and one (1) as the lowest rate.
            </Text>
          </Text>
        </View>
        {/* Table Area */}
        <View>
          <Table>
            {/* Table Header */}
            <TH>
              <TD
                style={{
                  ...styles.criteriaHeader,
                }}
              >
                CRITERIA
              </TD>
              {[1, 2, 3, 4, 5].map((col) => (
                <TD
                  key={col}
                  style={{
                    ...styles.tableHeader,
                  }}
                >
                  {col}
                </TD>
              ))}
            </TH>

            {/* Table Body */}
            {tableBody.map((row, rowIndex) => (
              <TR key={rowIndex}>
                {row[0]?.isCategory ? (
                  <TD
                    style={{
                      ...styles.categoryRow,
                    }}
                    colSpan={6}
                  >
                    {row[0].content}
                  </TD>
                ) : (
                  row.map((cell, cellIndex) => (
                    <TD
                      key={cellIndex}
                      style={
                        cellIndex === 0 ? styles.criteriaCell : styles.tableCell
                      }
                    >
                      {cell.content || cell}
                    </TD>
                  ))
                )}
              </TR>
            ))}
          </Table>
        </View>
        {/* Conversion Table Area */}
        <View
          style={{
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontFamily: "Helvetica-Bold",
              fontSize: 11,
            }}
          >
            CONVERSION TABLE
          </Text>

          <Table>
            {/* Table Header */}
            <TH>
              <TD
                style={{
                  textAlign: "center",
                  justifyContent: "center",
                  paddingBottom: 5,
                  fontFamily: "Helvetica-Bold",
                  fontSize: 11,
                }}
              >
                TOTAL POINTS
              </TD>
              <TD
                style={{
                  textAlign: "center",
                  justifyContent: "center",
                  paddingBottom: 5,
                  fontFamily: "Helvetica-Bold",
                  fontSize: 11,
                }}
              >
                EQUIVALENT RATING
              </TD>
              <TD
                style={{
                  textAlign: "center",
                  justifyContent: "center",
                  paddingBottom: 5,
                  fontFamily: "Helvetica-Bold",
                  fontSize: 11,
                }}
              >
                TOTAL POINTS
              </TD>
              <TD
                style={{
                  textAlign: "center",
                  justifyContent: "center",
                  paddingBottom: 5,
                  fontFamily: "Helvetica-Bold",
                  fontSize: 11,
                }}
              >
                EQUIVALENT RATING
              </TD>
            </TH>

            <TR>
              <TD
                style={{
                  fontFamily: "Helvetica-Bold",
                  fontSize: 10,
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                96-100
              </TD>
              <TD
                style={{
                  fontFamily: "Helvetica-Bold",
                  fontSize: 10,
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                1.25
              </TD>
              <TD
                style={{
                  fontFamily: "Helvetica-Bold",
                  fontSize: 10,
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                71-75
              </TD>
              <TD
                style={{
                  fontFamily: "Helvetica-Bold",
                  fontSize: 10,
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                2.50
              </TD>
            </TR>

            <TR>
              <TD
                style={{
                  fontFamily: "Helvetica-Bold",
                  fontSize: 10,
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                91-95
              </TD>
              <TD
                style={{
                  fontFamily: "Helvetica-Bold",
                  fontSize: 10,
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                1.30
              </TD>
              <TD
                style={{
                  fontFamily: "Helvetica-Bold",
                  fontSize: 10,
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                66-70
              </TD>
              <TD
                style={{
                  fontFamily: "Helvetica-Bold",
                  fontSize: 10,
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                2.75
              </TD>
            </TR>

            <TR>
              <TD
                style={{
                  fontFamily: "Helvetica-Bold",
                  fontSize: 10,
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                86-90
              </TD>
              <TD
                style={{
                  fontFamily: "Helvetica-Bold",
                  fontSize: 10,
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                1.75
              </TD>
              <TD
                style={{
                  fontFamily: "Helvetica-Bold",
                  fontSize: 10,
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                61-65
              </TD>
              <TD
                style={{
                  fontFamily: "Helvetica-Bold",
                  fontSize: 10,
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                3.00
              </TD>
            </TR>

            <TR>
              <TD
                style={{
                  fontFamily: "Helvetica-Bold",
                  fontSize: 10,
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                81-85
              </TD>
              <TD
                style={{
                  fontFamily: "Helvetica-Bold",
                  fontSize: 10,
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                2.00
              </TD>
              <TD
                style={{
                  fontFamily: "Helvetica-Bold",
                  fontSize: 10,
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                56-60
              </TD>
              <TD
                style={{
                  fontFamily: "Helvetica-Bold",
                  fontSize: 10,
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                4.00
              </TD>
            </TR>

            <TR>
              <TD
                style={{
                  fontFamily: "Helvetica-Bold",
                  fontSize: 10,
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                76-80
              </TD>
              <TD
                style={{
                  fontFamily: "Helvetica-Bold",
                  fontSize: 10,
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                2.25
              </TD>
              <TD
                style={{
                  fontFamily: "Helvetica-Bold",
                  fontSize: 10,
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                35 and below
              </TD>
              <TD
                style={{
                  fontFamily: "Helvetica-Bold",
                  fontSize: 10,
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                5.00
              </TD>
            </TR>
          </Table>
        </View>
        {/* Comments & Suggestions */}
        <View>
          <Text
            style={{
              fontFamily: "Helvetica-Bold",
              fontSize: 11,
            }}
          >
            COMMENTS & SUGGESTIONS:
          </Text>

          {comments && (
            <Text
              style={{
                fontFamily: "Helvetica",
                fontSize: 11,
              }}
            >
              {comments}
            </Text>
          )}
        </View>

        {/* Blank Lines */}
        {!comments && (
          <>
            {Array.from({ length: 5 }).map((_, index) => (
              <View
                key={index} // Add a unique key for each iteration
                style={{
                  flexDirection: "row",
                  marginTop: 20,
                  gap: 10,
                }}
              >
                <View style={{ flex: 1, alignItems: "center" }}>
                  <View
                    style={{
                      borderBottomWidth: 1, // Creates the underline
                      borderColor: "black",
                      flex: 1, // Stretches the underline
                      alignSelf: "stretch", // Ensures it stretches fully
                      marginBottom: 2, // Spacing between line and label
                    }}
                  />
                </View>
              </View>
            ))}
          </>
        )}

        {/* Rated by: */}
        <View
          style={{
            marginTop: 25,
          }}
        >
          <Text
            style={{
              fontFamily: "Helvetica-Bold",
              fontSize: 11,
              marginBottom: 30,
            }}
          >
            Rated by:
          </Text>
        </View>
        {/* Signature over printed name - signature over printed name */}
        <View
          style={{
            flexDirection: "row", // Places StudentName and CompanyName side by side
            justifyContent: "space-between", // Separates the two sections
            alignItems: "flex-end",
            marginVertical: 10, // Adds spacing above and below
            gap: 20, // Adds gap between sections
          }}
        >
          {/* Left Section - Student */}
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text
              style={{
                fontFamily: "Helvetica",
                fontWeight: "bold",
                fontSize: 12,
                marginBottom: 2, // Spacing between name and line
              }}
            ></Text>
            <View
              style={{
                borderBottomWidth: 1, // Creates the underline
                borderColor: "black",
                flex: 1, // Stretches the underline
                alignSelf: "stretch", // Ensures it stretches fully
                marginBottom: 2, // Spacing between line and label
              }}
            />
            <Text
              style={{
                fontFamily: "Helvetica",
                fontSize: 10,
              }}
            >
              (Signature over Printed Name)
            </Text>
          </View>

          <View style={{ flex: 1 }} />
        </View>
        {/* Designation */}
        <View
          style={{
            flexDirection: "row", // Places StudentName and CompanyName side by side
            justifyContent: "space-between", // Separates the two sections
            alignItems: "flex-end",
            marginVertical: 10, // Adds spacing above and below
            gap: 20, // Adds gap between sections
          }}
        >
          {/* Left Section - Student */}
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text
              style={{
                fontFamily: "Helvetica",
                fontWeight: "bold",
                fontSize: 12,
                marginBottom: 2, // Spacing between name and line
              }}
            >
              {jobTitle}
            </Text>
            <View
              style={{
                borderBottomWidth: 1, // Creates the underline
                borderColor: "black",
                flex: 1, // Stretches the underline
                alignSelf: "stretch", // Ensures it stretches fully
                marginBottom: 2, // Spacing between line and label
              }}
            />
            <Text
              style={{
                fontFamily: "Helvetica",
                fontSize: 10,
              }}
            >
              (Designation)
            </Text>
          </View>

          <View style={{ flex: 1 }} />
        </View>

        {/* Approved */}
        <View
          style={{
            marginTop: 25,
          }}
        >
          <Text
            style={{
              fontFamily: "Helvetica-Bold",
              fontSize: 11,
              marginBottom: 30,
            }}
          >
            Approved:
          </Text>
        </View>

        {/* Signature over printed name of dept.head - signature over printed name of dept.head */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between", // Separates the two sections
            alignItems: "flex-end",
            marginVertical: 10, // Adds spacing above and below
            gap: 20, // Adds gap between sections
          }}
        >
          {/* Left Section - Student */}
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text
              style={{
                fontFamily: "Helvetica",
                fontWeight: "bold",
                fontSize: 12,
                marginBottom: 2, // Spacing between name and line
              }}
            ></Text>
            <View
              style={{
                borderBottomWidth: 1, // Creates the underline
                borderColor: "black",
                flex: 1, // Stretches the underline
                alignSelf: "stretch", // Ensures it stretches fully
                marginBottom: 2, // Spacing between line and label
              }}
            />
            <Text
              style={{
                fontFamily: "Helvetica",
                fontSize: 10,
              }}
            >
              (Signature over Printed Name of Dept.Head)
            </Text>
          </View>

          <View style={{ flex: 1 }} />
        </View>

        {/* Department */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between", // Separates the two sections
            alignItems: "flex-end",
            marginVertical: 10, // Adds spacing above and below
            gap: 20, // Adds gap between sections
          }}
        >
          {/* Left Section - Student */}
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text
              style={{
                fontFamily: "Helvetica",
                fontWeight: "bold",
                fontSize: 12,
                marginBottom: 2, // Spacing between name and line
              }}
            >
              {officeName}
            </Text>
            <View
              style={{
                borderBottomWidth: 1, // Creates the underline
                borderColor: "black",
                flex: 1, // Stretches the underline
                alignSelf: "stretch", // Ensures it stretches fully
                marginBottom: 2, // Spacing between line and label
              }}
            />
            <Text
              style={{
                fontFamily: "Helvetica",
                fontSize: 10,
              }}
            >
              (Department)
            </Text>
          </View>

          <View style={{ flex: 1 }} />
        </View>
      </Page>
    </Document>
  );
};

export default GeneratePerformanceEvaluationReport;
