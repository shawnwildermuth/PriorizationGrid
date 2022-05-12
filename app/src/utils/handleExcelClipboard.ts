export default function handleExcelClipboard(clipboardData: DataTransfer)
{
  const pastedText = clipboardData.getData("Text") || clipboardData.getData("text/plain");
  
  if (!pastedText && pastedText.length) {
      return;
  }

  
  const rows = pastedText.replace(/"((?:[^"]*(?:\r\n|\n\r|\n|\r))+[^"]+)"/mg, function (match, p1) {
      // This function runs for each cell with multi lined text.
      return p1
          // Replace any double double-quotes with a single
          // double-quote
          .replace(/""/g, '"')
          // Replace all new lines with spaces.
          .replace(/\r\n|\n\r|\n|\r/g, ' ')
      ;
  })
  // Split each line into rows
  .split(/\r\n|\n\r|\n|\r/g);

  return rows;
}

