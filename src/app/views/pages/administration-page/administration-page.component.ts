import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-administration-page',
  imports: [],
  templateUrl: './administration-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdministrationPageComponent {

  downloadCSV(): void {
    // Sample data for CSV
    const csvData = [
      ["Name", "Email", "Age"],
      ["John Doe", "john@example.com", "30"],
      ["Jane Smith", "jane@example.com", "25"],
      ["Bob Johnson", "bob@example.com", "45"],
    ]

    // Convert array to CSV string
    const csvContent = csvData.map((row) => row.join(",")).join("\n")

    // Create a Blob with the CSV data
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })

    // Create a download link
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)

    // Set link properties
    link.setAttribute("href", url)
    link.setAttribute("download", "sample_data.csv")
    link.style.visibility = "hidden"

    // Add to document, click and remove
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}
