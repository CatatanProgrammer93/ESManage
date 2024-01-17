using System.ComponentModel.DataAnnotations;

namespace es_manage.api.Models
{
    public class MenuModel
    {
        public string ID { get; set; } = string.Empty;
        public string MenuName { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public bool Deleted {  get; set; }
    }
}