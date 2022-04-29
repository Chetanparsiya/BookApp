package com.unborn.book.bookapp.helper;

import com.unborn.book.bookapp.entities.Book;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class ExcelHelper {

    private static String TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    static String[] HEADERs = { "Id", "Title", "Author", "ISBNNumber", "Price", "Language", "CoverPhotoUrl" };
    static String SHEET = "Books";
    public static boolean hasExcelFormat(MultipartFile file) {
        if (!TYPE.equals(file.getContentType())) {
            return false;
        }
        return true;
    }

    public static List<Book> excelToTutorials(InputStream is) {
        try {
            Workbook workbook = new XSSFWorkbook(is);
            Sheet sheet = workbook.getSheet(SHEET);
            Iterator<Row> rows = sheet.iterator();
            List<Book> books = new ArrayList<Book>();
            int rowNumber = 0;
            while (rows.hasNext()) {
                Row currentRow = rows.next();
                if (rowNumber == 0) {
                    rowNumber++;
                    continue;
                }
                Iterator<Cell> cellsInRow = currentRow.iterator();
                Book book = new Book();
                int cellIdx = 0;
                while (cellsInRow.hasNext()) {
                    Cell currentCell = cellsInRow.next();
                    switch (cellIdx) {
                        case 0:
                            book.setTitle(currentCell.getStringCellValue());
                            break;
                        case 1:
                            book.setAuthor(currentCell.getStringCellValue());
                            break;
                        case 2:
                            book.setIsbnNumber((long)currentCell.getNumericCellValue());
                            break;
                        case 3:
                            book.setPrice((double)currentCell.getNumericCellValue());
                            break;
                        case 4:
                            book.setLanguage(currentCell.getStringCellValue());
                            break;
                        case 5:
                            book.setCoverPhotoUrl(currentCell.getStringCellValue());
                            break;

                        default:
                            break;
                    }
                    cellIdx++;
                }
                books.add(book);
            }
            workbook.close();
            return books;
        } catch (IOException e) {
            throw new RuntimeException("fail to parse Excel file: " + e.getMessage());
        }
    }
}

