
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Save, Undo, Redo } from 'lucide-react';
import { createBackup, restoreBackup, getBackupInfo, restoreToDefaults, BackupData } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const BackupPanel = () => {
  const [backupInfo, setBackupInfo] = useState<BackupData | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setBackupInfo(getBackupInfo());
  }, [isOpen]);

  const handleCreateBackup = () => {
    try {
      const backup = createBackup();
      setBackupInfo(backup);
      toast({
        title: "Backup Criado",
        description: `Backup salvo com sucesso em ${new Date(backup.timestamp).toLocaleString()}`
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao criar backup",
        variant: "destructive"
      });
    }
  };

  const handleRestoreBackup = () => {
    try {
      const success = restoreBackup();
      if (success) {
        toast({
          title: "Backup Restaurado",
          description: "Dados restaurados com sucesso"
        });
        setIsOpen(false);
        window.location.reload(); // Recarrega para atualizar todos os componentes
      } else {
        toast({
          title: "Erro",
          description: "Nenhum backup encontrado",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao restaurar backup",
        variant: "destructive"
      });
    }
  };

  const handleRestoreDefaults = () => {
    try {
      restoreToDefaults();
      toast({
        title: "Dados Padrão Restaurados",
        description: "Sistema restaurado para configuração inicial"
      });
      setIsOpen(false);
      window.location.reload();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao restaurar dados padrão",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center space-x-2">
          <Save className="w-4 h-4" />
          <span>Backup</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Sistema de Backup</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Informações do Backup */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Status do Backup</h3>
            {backupInfo ? (
              <div className="text-sm text-gray-600">
                <p><strong>Último backup:</strong> {new Date(backupInfo.timestamp).toLocaleString()}</p>
                <p><strong>Fornecedores:</strong> {backupInfo.suppliers.length}</p>
                <p><strong>Categorias:</strong> {backupInfo.categories.length}</p>
                <p><strong>Usuários:</strong> {backupInfo.users.length}</p>
              </div>
            ) : (
              <p className="text-sm text-gray-500">Nenhum backup encontrado</p>
            )}
          </div>

          {/* Ações de Backup */}
          <div className="space-y-3">
            <Button 
              onClick={handleCreateBackup}
              className="w-full flex items-center justify-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Salvar Estado Atual</span>
            </Button>

            <Button 
              onClick={handleRestoreBackup}
              variant="outline"
              className="w-full flex items-center justify-center space-x-2"
              disabled={!backupInfo}
            >
              <Undo className="w-4 h-4" />
              <span>Restaurar Backup</span>
            </Button>

            <Button 
              onClick={handleRestoreDefaults}
              variant="outline"
              className="w-full flex items-center justify-center space-x-2 border-orange-300 text-orange-600 hover:bg-orange-50"
            >
              <Redo className="w-4 h-4" />
              <span>Restaurar Padrão</span>
            </Button>
          </div>

          {/* Aviso */}
          <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
            <p className="text-xs text-yellow-800">
              <strong>Atenção:</strong> A restauração irá sobrescrever todos os dados atuais. 
              Certifique-se de criar um backup antes de restaurar.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BackupPanel;
