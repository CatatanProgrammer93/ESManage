namespace es_manage.api.Models
{
    public class ReportModel
    {
        public string ID { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public string TableName { get; set; } = string.Empty;
        public string Details { get; set; } = string.Empty;
        public DateTime? Date { get; set; }
    }
}
