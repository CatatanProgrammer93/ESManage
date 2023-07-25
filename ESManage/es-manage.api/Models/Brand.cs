// Namespace
namespace es_manage.api.Models {
    public class Brand {
        public string ID { get; set; }
        public string Name { get; set; } = string.Empty;
        public bool Deleted { get; set; }
        public DateTime CreatedOn { get; set; }
        public string CreatedBy { get; set; } = string.Empty;
        public DateTime? ModifiedOn { get; set; }
        public string ModifiedBy { get; set; } = string.Empty;
    }
}
