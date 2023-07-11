// Namespace
namespace es_manage.api.Models {
    // Membuat class UserMst
    public class UserMst {
        // ID dengan tipe data GUID, not null, dan primary key
        public Guid ID { get; set; }

        // UserName dengan tipe data string, not null, dengan default value string kosong
        public string UserName { get; set; } = string.Empty;

        // DisplayName dengan tipe data string, null-able, dengan default value string kosong
        public string? DisplayName { get; set; } = string.Empty;

        // Password dengan tipe data string, not null, dengan default value string kosong
        public string Password { get; set; } = string.Empty;

        // CreatedOn dengan tipe data DateTime, not null, dengan default value saat data dibuat
        public DateTime CreatedOn { get; set; }

        // CreatedBy dengan tipe data string, null-able, dengan default value string kosong
        public string? CreatedBy { get; set; } = string.Empty;

        // ModifiedOn dengan tipe data DateTime, null-able, dengan default value saat data diedit
        public DateTime? ModifiedOn { get; set; }

        // ModifiedBy dengan tipe data string, null-able, dengan default value string kosong
        public string? ModifiedBy { get; set; } = string.Empty;

        // DeletedAt dengan tipe data DateTime, null-able, dengan default value saat data dihapus
        public DateTime? DeletedAt { get; set; }
    }
}