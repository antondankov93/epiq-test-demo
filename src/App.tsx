import { DocumentList, DocumentViewer } from './components/document';
import { AnnotationPanel } from './components/annotation';
import { documents, knowledgeUnitSchemas } from './utils/mockData';
import { useDocuments, useHighlighting } from './hooks';
import './App.css';

function App() {
  const {
    allDocuments,
    selectedDocumentId,
    selectedDocument,
    knowledgeUnits,
    highlights,
    selectDocument,
    updateKnowledgeUnits
  } = useDocuments(documents);

  const {
    activeHighlightingField,
    activeHighlightIds,
    toggleHighlighting,
    handleTextSelect,
    handleHighlightClick,
    addHighlight
  } = useHighlighting(knowledgeUnits, highlights, updateKnowledgeUnits);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <DocumentList
        selectedDocumentId={selectedDocumentId}
        documents={allDocuments}
        onSelectDocument={selectDocument}
      />
      <DocumentViewer
        highlights={highlights}
        activeHighlightIds={activeHighlightIds}
        document={selectedDocument}
        onTextSelect={handleTextSelect}
        onHighlightClick={handleHighlightClick}
        isHighlightingActive={!!activeHighlightingField}
      />
      <AnnotationPanel
        activeHighlightingField={activeHighlightingField}
        knowledgeUnitSchemas={knowledgeUnitSchemas}
        knowledgeUnits={knowledgeUnits}
        documentId={selectedDocumentId}
        onUpdateKnowledgeUnits={updateKnowledgeUnits}
        onToggleHighlighting={toggleHighlighting}
        onAddHighlight={addHighlight}
      />
    </div>
  );
}

export default App;
