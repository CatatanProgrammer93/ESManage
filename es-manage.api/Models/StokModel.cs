using System.ComponentModel.DataAnnotations;

namespace es_manage.api.Models
{
    public class StokModel
    {
        public string ID { get; set; } = string.Empty;
        public string ItemId { get; set; }
        public string Stok { get; set; }
        public bool Deleted { get; set; }
    }
}