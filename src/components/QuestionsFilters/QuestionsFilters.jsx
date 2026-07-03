import styles from "./QuestionsFilters.module.css";

export function QuestionsFilters({
  search,
  specializationId,
  selectedSkills,
  specializations,
  skills,
  onSearchChange,
  onSpecChange,
  onToggleSkill,
}) {
  return (
    <>
      <div className={styles.filters}>
        <input
          className={styles.search}
          type="text"
          placeholder="Поиск по вопросам"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />

        <select
          className={styles.select}
          value={specializationId}
          onChange={(e) => onSpecChange(e.target.value)}
        >
          <option value="">Все специализации</option>
          {specializations.map((spec) => (
            <option key={spec.id} value={spec.id}>
              {spec.title}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.chips}>
        {skills.map((skill) => (
          <button
            key={skill.id}
            className={`${styles.chip} ${selectedSkills.includes(String(skill.id)) ? styles.chipActive : ""}`}
            onClick={() => onToggleSkill(skill.id)}
          >
            {skill.title}
          </button>
        ))}
      </div>
    </>
  );
}
