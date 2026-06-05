const fs = require('fs');
const path = 'd:/digixito-projects/slater-matsil/components/layouts/admin-layout/InsightsAdminLayout.tsx';
let lines = fs.readFileSync(path, 'utf8').split('\n');

const newProps = `        activeId={activeId}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cardData={cardData}
        setCardData={setCardData}
        heroData={heroData}
        setHeroData={setHeroData}
        contentSections={contentSections}
        setContentSections={setContentSections}
        errors={errors}
        setErrors={setErrors}
        isUploadingImage={isUploadingImage}
        handleImageUpload={handleImageUpload}
        handleDeleteImage={() => {
          if (heroData.rawImageUrl && !keysToDeleteOnSave.includes(heroData.rawImageUrl)) {
            setKeysToDeleteOnSave(prev => [...prev, heroData.rawImageUrl]);
          }
          setHeroData({ ...heroData, profileImage: "", rawImageUrl: "" });
        }}
        handleSave={handleSave}
        handleContentSectionChange={handleContentSectionChange}
      />`;

// line 568 is index 567
// line 862 is index 861
lines.splice(567, 861 - 567 + 1, newProps);
fs.writeFileSync(path, lines.join('\n'));
console.log('Fixed InsightsAdminLayout');
